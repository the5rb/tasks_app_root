from rest_framework import serializers
from task.models import Tasks, Tab


class TabSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tab
        fields = '__all__'

class TasksSerializer(serializers.ModelSerializer):
    task = serializers.CharField(required=True)
    status = serializers.BooleanField(required=False)
    date = serializers.DateTimeField(required=False)
    tab = TabSerializer()

    class Meta:
        model = Tasks
        fields = '__all__'

class TaskCreatedInTabSerializer(serializers.ModelSerializer):
    task = serializers.CharField(required=True)
    status = serializers.BooleanField(required=False)
    date = serializers.DateTimeField(required=False)
    tab = serializers.PrimaryKeyRelatedField(queryset=Tab.objects.all(), required=True)

    class Meta:
        model = Tasks
        fields = '__all__'
