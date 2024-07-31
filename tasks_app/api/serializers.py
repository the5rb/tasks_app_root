from rest_framework import serializers
from task.models import Tasks

class TasksSerializer(serializers.ModelSerializer):
    task = serializers.CharField(required=True)
    status = serializers.BooleanField(required=False)
    date = serializers.DateTimeField(required=False)

    class Meta:
        model = Tasks
        fields = '__all__'