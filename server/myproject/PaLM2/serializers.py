from rest_framework import serializers

class GenerateTextSerializer(serializers.Serializer):
    prompt = serializers.CharField(required=True)
