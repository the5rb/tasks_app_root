from django.urls import path
from .views import (
    TasksAPIView, 
    TasksCreateAPIView, 
    TaskUpdateAPIView, 
    TaskDeleteAPIView, 
    TabListCreateAPIView, 
    TabUpdateAPIView, 
    TabDeleteAPIView
) 

urlpatterns = [
    path('', TasksAPIView.as_view(), name='task_list'),
    path('tasks/create/', TasksCreateAPIView.as_view(), name='task_create'),
    path('tasks/<int:id>/update-status/', TaskUpdateAPIView.as_view(), name='task_update_status'),
    path('tasks/edit-task/<int:id>/', TaskUpdateAPIView.as_view(), name='edit_task'),
    path('tasks/delete/<int:id>/', TaskDeleteAPIView.as_view(), name='delete_task'),
    path('tab/list/', TabListCreateAPIView.as_view(), name='tab_list'),
    path('tab/create/', TabListCreateAPIView.as_view(), name='tab_create'),
    path('tab/update/<int:pk>', TabUpdateAPIView.as_view(), name='tab_update'),
    path('tab/delete/<int:pk>', TabDeleteAPIView.as_view(), name='tab_delete'),
]