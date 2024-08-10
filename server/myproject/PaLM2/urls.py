from django.urls import path
from .views import GenerateTextView, text_form

urlpatterns = [
    path('generate-text/', GenerateTextView.as_view(), name='generate_text'),
    path('generate-text-form/', text_form, name='text_form'),  # URL to access the form
]
