from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.conf import settings
import google.generativeai as genai
from .serializers import GenerateTextSerializer

class GenerateTextView(APIView):
    def post(self, request):
        serializer = GenerateTextSerializer(data=request.data)
        if serializer.is_valid():
            prompt = serializer.validated_data['prompt']
            try:
                genai.configure(api_key=settings.GEMINI_API_KEY)
                model = genai.GenerativeModel("gemini-1.5-flash")
                response = model.generate_content(prompt)
                return Response({'text': response.text}, status=status.HTTP_200_OK)
            except Exception as e:
                # Provide a clear error message
                return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    
           
        

        
