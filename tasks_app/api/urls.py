from django.urls import path
from .views import TasksAPIView, TasksCreateAPIView, TaskUpdateAPIView, TaskDeleteAPIView

urlpatterns = [
    path('', TasksAPIView.as_view(), name='task_list'),
    path('tasks/create/', TasksCreateAPIView.as_view(), name='task_create'),
    path('tasks/<int:id>/update-status/', TaskUpdateAPIView.as_view(), name='task_update_status'),
    path('tasks/delete/<int:id>/', TaskDeleteAPIView.as_view(), name='delete_task')
]