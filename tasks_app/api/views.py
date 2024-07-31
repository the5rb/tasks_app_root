from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from task.models import Tasks
from .serializers import TasksSerializer


class TasksAPIView(generics.ListAPIView):
    queryset = Tasks.objects.all()
    serializer_class = TasksSerializer

class TasksCreateAPIView(APIView):
    def post(self, request, format=None):
        serializer = TasksSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class TaskUpdateAPIView(generics.UpdateAPIView):
    queryset = Tasks.objects.all()
    serializer_class = TasksSerializer
    lookup_field = 'id'

class TaskDeleteAPIView(APIView):
    def delete(self, request, id):
        if request.method == 'DELETE':
            queryset = Tasks.objects.get(id=id)
            queryset.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
