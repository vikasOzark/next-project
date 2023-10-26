from django.urls import path, include
from rest_framework import routers
from authentication.views import AuthenticationViewset, PermissionHandlerViewset, UserManagement

auth_routes = routers.SimpleRouter()
auth_routes.register(r"", AuthenticationViewset, basename="auth")

permission_router = routers.SimpleRouter()
permission_router.register(r"", PermissionHandlerViewset, basename="manage_permission")

user_viewset = routers.SimpleRouter()
user_viewset.register("", UserManagement, basename="manage_user")


urlpatterns = [
    path("", include(auth_routes.urls)),
    path("users/", include(user_viewset.urls)),
    path("permissions/", include(permission_router.urls))
]

