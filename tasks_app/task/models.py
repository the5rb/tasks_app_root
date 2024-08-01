from django.db import models
import random
import string

# Create random string for tab_id helper function
def get_random_string():
    letters = string.ascii_letters
    random_string = ''.join(random.choice(letters) for i in range(25))
    return random_string

class Tasks(models.Model):
    task = models.TextField(max_length=500, default='')
    status = models.BooleanField(null=False)
    date = models.DateTimeField(auto_now_add=True, null=True)
    tab = models.ForeignKey('Tab', on_delete=models.CASCADE)


class Tab(models.Model):
    tab_name = models.CharField(max_length=50, default='untitled')
    tab_id = models.CharField(max_length=25, default=get_random_string, unique=True, auto_created=True)