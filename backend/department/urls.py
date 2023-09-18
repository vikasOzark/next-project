from django.urls import path
from rest_framework.routers import DefaultRouter, SimpleRouter
from department.views import DepartmentViewSet

router = DefaultRouter()
router.register(r'', DepartmentViewSet, basename='department')
urlpatterns = router.urls