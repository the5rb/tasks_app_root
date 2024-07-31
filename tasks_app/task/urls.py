from django.urls import path
from .views import TasksListiew

urlpatterns = [
    path("", TasksListiew.as_view(), name="tasks")
]