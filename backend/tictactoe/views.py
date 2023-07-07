from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from django.shortcuts import get_object_or_404
from .serializers import *
from .models import *
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.models import Token

# Create your views here.

# @api_view(['GET'])
# def game_list(request):
#     if request.method == 'GET':
#         data = GameList.objects.all()
#         serializer = SheetSerializer(data, context={'request': request}, many=True)
#         return Response(serializer.data)

# class CreateUserAPIView(APIView):
#     def post(self, request):
#         serializer = CreateUserSerializer(data=request.data)
#         serializer.is_valid(raise_exception=True)
#         serializer.save() 

#         return Response({'new_user': serializer.data})



class GameListAPIView(APIView):
    permission_classes = (IsAuthenticated, )
    def get(self, request):
        token = request.headers['Authorization'].split()[-1]
        user = Token.objects.select_related('user').get(key=token).user
        m = user.gamelist.all()
        serializer = GameListSerialazer(m, many=True)
        return Response({'gamelist': serializer.data})
 
    def post(self, request):
        token = request.headers['Authorization'].split()[-1]
        user_id = Token.objects.get(key=token).user_id
        data = request.data
        data['user_pk'] = user_id
        serializer = GameListSerialazer(data=data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
 
        return Response({'new_game': serializer.data})

    def put(self, request, *args, **kwargs):
        pk = kwargs.get("pk", None)
        if not pk:
            return Response({"error": "Method PUT not allowed"})
 
        try:
            instance = GameList.objects.get(pk=pk)
        except:
            return Response({"error": "Object does not exists"})
 
        serializer = GameListSerialazer(data=request.data, instance=instance)
        serializer.is_valid(raise_exception=True)
        serializer.save()
 
        return Response({"updated_game": serializer.data})  

    def delete(self, request, *args, **kwargs):
        pk = kwargs.get("pk", None)
        if not pk:
            return Response({"error": "Method DELETE not allowed"})
        try:
            instance = GameList.objects.get(pk=pk)
        except:
            return Response({"error": "Object does not exists"}) 
      
        instance.delete()       
 
        return Response({"delete_game": "" + str(pk)})      