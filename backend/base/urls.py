from django.contrib import admin
from django.urls import path, include
VERSION = "v1/api"

urlpatterns = [
    path('admin/', admin.site.urls),
    path(f"{VERSION}/auth/", include("authentication.urls")),
    path(f"{VERSION}/department/", include("department.urls")),
#     path(f"{VERSION}/tickets/", include("tickets.urls")),
]
