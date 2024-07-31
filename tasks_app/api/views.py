from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from task.models import Tasks, Tab
from .serializers import TasksSerializer, TabSerializer, TaskCreatedInTabSerializer


class TasksAPIView(generics.ListAPIView):
    queryset = Tasks.objects.all()
    serializer_class = TasksSerializer

class TasksCreateAPIView(APIView):
    def post(self, request, format=None):
        serializer = TaskCreatedInTabSerializer(data=request.data)
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


class TabListCreateAPIView(generics.ListCreateAPIView):
    queryset = Tab.objects.all()
    serializer_class = TabSerializer

class TabUpdateAPIView(generics.UpdateAPIView):
    queryset = Tab.objects.all()
    serializer_class = TabSerializer
    lookup_field = 'pk'

class TabDeleteAPIView(APIView):
    def delete(self, request, pk):
        if request.method == 'DELETE':
            queryset = Tab.objects.get(id=pk)
            queryset.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)