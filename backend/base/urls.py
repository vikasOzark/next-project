from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView
)

VERSION = "v1/api"

urlpatterns = [
    path('admin/', admin.site.urls),
    path(f"{VERSION}/auth/", include("authentication.urls")),
    path(f"{VERSION}/department/", include("department.urls")),
    path(f"{VERSION}/token/", TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path(f"{VERSION}/token/refresh/", TokenRefreshView.as_view(), name='token_refresh'),
    path(f"{VERSION}/token/verify/", TokenVerifyView.as_view(), name='token_verify')
    # path(f"{VERSION}/tickets/", include("tickets.urls")),
]