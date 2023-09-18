from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path("v1/api/auth/", include("authentication.urls")),
    path("v1/api/department/", include("department.urls"))
]
