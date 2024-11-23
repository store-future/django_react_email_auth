from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from django.utils.timezone import now, timedelta
from django.core.mail import send_mail
from django.conf import settings
from django.contrib.auth import get_user_model
from .models import OtpToken, CustomUser  # Import your models
from .serializers import *
from rest_framework.decorators import api_view
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from django.contrib.auth import login
from django.contrib.auth.decorators import login_required

User = get_user_model()

@csrf_exempt
def send_otp_view(request):
    if request.method == 'POST':
        try:
            # Parse the request body for JSON data
            data = json.loads(request.body)
            email = data.get('email')

            if not email:
                return JsonResponse({"error": "Email is required."}, status=400)
        
            print(f"send_otp_request_data :{data}")

            # Check if user exists
            try:
                user = CustomUser.objects.get(email=email)
            except CustomUser.DoesNotExist:
                return JsonResponse({"error": "User with this email does not exist."}, status=404)

            # Generate OTP and save it in the database
            otp = OtpToken.objects.create(
                user=user,
                otp_expires_at=now() + timedelta(minutes=5)  # OTP valid for 5 minutes
            )

            # Send OTP via email
            subject = "Your Login OTP"
            message = f"""
                Hi {user.username},
                Your OTP for login is: {otp.otp_code}.
                It will expire in 5 minutes.
            """
            send_mail(subject, message, settings.DEFAULT_FROM_EMAIL, [email])

            return JsonResponse({"message": "OTP sent to your email.", "otp": otp.otp_code}, status=200)  # Return OTP for testing
        except Exception as e:
            print(f"Error occurred: {e}")  # Log the exception
            return JsonResponse({"error": str(e)}, status=500)
    return JsonResponse({"error": "Invalid request method."}, status=405)


@csrf_exempt
def verify_otp_view(request):
    if request.method == 'POST':
        try:
            print("i am in verify otp")
            # Parse the request body for JSON data
            data = json.loads(request.body)
            email = data.get('email')
            otp_code = data.get('otp')
            print(f"data :{data}")


            if not email or not otp_code:
                return JsonResponse({"error": "Email and OTP are required."}, status=400)

            # Validate the user and OTP
            try:
                user = CustomUser.objects.get(email=email)
                otp = OtpToken.objects.filter(user=user, otp_code=otp_code).first()
                print(f"user {user} opt {otp} otpcode databse {otp.otp_code}")
                
                if not otp or otp.otp_expires_at < now():
                    return JsonResponse({"error": "Invalid or expired OTP."}, status=400)
                
                # OTP is valid create session
                return JsonResponse({ "success":True ,"message": "OTP verified successfully."}, status=200)
            except CustomUser.DoesNotExist:
                return JsonResponse({"error": "User not found."}, status=404)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)
    return JsonResponse({"error": "Invalid request method."}, status=405)

@csrf_exempt
def FeedbackHandle (request):
    if request.method =="POST":
        

        #check if user is auhtenticated or not
        # if not request.user.is_authenticated:
        #     return JsonResponse({"message" : "user is not authenticated"} , status=status.HTTP_401_UNAUTHORIZED)
        # Manually add the logged-in user to the feedback data
        # data['user'] = request.user.id


        # Get the data from the request
        data = json.loads(request.body)
        

        # required fields for sending mail
        data['product'] = ' & '.join(data['product'])         #converting array to string
        data_product = data['product']
        data_to_email = data['email']
        data_rating = data['rating']
        data_description = data['description']

        # user = CustomUser.objects.get(email=data_to_email)
        # print(f"user {user}")

        print(f"data received from frontend : {data}")

        # Serialize the data
        serializer = FeedbackSerializer(data = data)
        # print(f"serializer data {serializer}")

        # # Validate and save the data
        if serializer.is_valid():
            serializer.save()
            
            # Send mail to director
            subject = f"Feedback for {data_product} "
            message = f"Hi Team,\n\nYou have received a new feedback from\nId : {data_to_email},\nProduct : {data_product},\nRating :{data_rating} Star.\n\nThanks & Regards \nWinline Technologis pvt ltd. "
            # send_mail(subject, message, settings.DEFAULT_FROM_EMAIL,['parashuram.s@winlinetech.com'])
            send_mail(subject, message, settings.DEFAULT_FROM_EMAIL,['dhananjayasharma45@gmail.com'])

            # Send mail to feedback user
            subject = f"Feedback for {data_product} "
            message = f"Hi user,\n\nThankyou for your valuable feedback for the product : {data_product} with {data_rating} Star Rating.\n\nThanks & Regards \nWinline Technologis pvt ltd. "
            send_mail(subject, message, settings.DEFAULT_FROM_EMAIL,[data_to_email])


            return JsonResponse({"message": "Feedback submitted successfully!"}, status=status.HTTP_201_CREATED)
        else:
            return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
