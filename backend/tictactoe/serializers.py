from rest_framework import serializers
from .models import *
from django.contrib.auth.models import User


class GameListSerialazer(serializers.Serializer):
    pk=serializers.IntegerField(read_only=True)
    game_field= serializers.CharField(max_length=255)
    player_figure = serializers.CharField(max_length=100)
    winner = serializers.CharField(max_length=100)
    winner_cells = serializers.CharField(max_length=255)
    user_pk = serializers.IntegerField()
    game_date = serializers.CharField(source='get_game_date', read_only=True)
    game_time = serializers.CharField(source='get_game_time', read_only=True)

    def create(self, validated_data):
        return GameList.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.game_field = validated_data.get('game_field', instance.game_field)
        instance.player_figure = validated_data.get('player_figure', instance.player_figure)
        instance.winner = validated_data.get('winner', instance.winner)
        instance.winner_cells = validated_data.get('winner_cells', instance.winner_cells)
        instance.user_pk = validated_data.get('user_pk', instance.user_pk)
        instance.save()
        return instance





# class SettingSerializer(serializers.ModelSerializer):
#     private_key_ = serializers.CharField(source='get_private_key')

#     class Meta:
#         model = Setting
#         fields = ('type',
#                   'project_id',
#                   'private_key_id',
#                   'private_key_',
#                   'client_email',
#                   'client_id',
#                   'auth_uri',
#                   'token_uri',
#                   'auth_provider_x509_cert_url',
#                   'client_x509_cert_url',
#                   'scopes',
#                   'spreadsheet_id',
#                   'ranges',
#                   )

#     def update(self, instance, validated_data):
#         instance.type = validated_data.get('type', instance.type)
#         instance.project_id = validated_data.get('project_id', instance.project_id)
#         instance.private_key_id = validated_data.get('private_key_id', instance.private_key_id)
#         instance.private_key = validated_data.get('private_key_', instance.private_key).replace(r'\n', '[;]')
#         instance.client_email = validated_data.get('client_email', instance.client_email)
#         instance.client_id = validated_data.get('client_id', instance.client_id)
#         instance.auth_uri = validated_data.get('auth_uri', instance.auth_uri)
#         instance.token_uri = validated_data.get('token_uri', instance.token_uri)
#         instance.auth_provider_x509_cert_url = validated_data.get('auth_provider_x509_cert_url',
#                                                                   instance.auth_provider_x509_cert_url)
#         instance.client_x509_cert_url = validated_data.get('client_x509_cert_url', instance.client_x509_cert_url)
#         instance.scopes = validated_data.get('scopes', instance.scopes)
#         instance.spreadsheet_id = validated_data.get('spreadsheet_id', instance.spreadsheet_id)
#         instance.ranges = validated_data.get('ranges', instance.ranges)

#         instance.save()
#         return instance