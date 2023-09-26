from django.urls import path, include
from rest_framework import routers
from authentication.views import AuthenticationViewset, PermissionHandlerViewset

auth_routes = routers.SimpleRouter()
auth_routes.register(r"", AuthenticationViewset, basename="auth")

permission_router = routers.SimpleRouter()
permission_router.register("", PermissionHandlerViewset, basename="manage_permission")

urlpatterns = [
    path("", include(auth_routes.urls)),
    path("permissions/", include(permission_router.urls))
]

