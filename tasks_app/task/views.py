from typing import Any
from django.shortcuts import render
from django.views.generic import ListView
from .models import Tasks


class TasksListiew(ListView):
    model = Tasks
    template_name = 'tasks.html'


