from django.shortcuts import render
from department.models import Department
from authentication.models import User
from rest_framework import viewsets
from department.serializers import DepartmentSerializer
from utils.permissions import TokenAuthentication


class DepartmentViewSet(viewsets.ModelViewSet):
    
    permission_classes = [TokenAuthentication]
    serializer_class = DepartmentSerializer
    

    def get_queryset(self):
        # qs =  super().get_queryset()
        token = self.request.META.get("HTTP_AUTHENTICATION")
        parent_user, current_user = TokenAuthentication().user_info(token)
        print(parent_user, current_user)
        if not parent_user:
            return Department.objects.filter(user = current_user)
        else :
            return Department.objects.filter(user = parent_user)
    
