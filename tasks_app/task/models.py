from django.db import models

class Tasks(models.Model):
    task = models.TextField(max_length=500, default='')
    status = models.BooleanField(null=False)
    date = models.DateTimeField(auto_now_add=True, null=True)