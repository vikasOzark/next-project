from django.urls import path, include
from rest_framework import routers
from authentication.views import AuthenticationViewset

auth_routes = routers.SimpleRouter()
auth_routes.register(r"", AuthenticationViewset, basename="auth")

# Adding routers url to the urlpatterns

urlpatterns = [
    path("", include(auth_routes.urls))
]

