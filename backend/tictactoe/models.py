from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class GameList(models.Model):
    game_field = models.CharField('поле игры', max_length=255, null=False, blank=True, default='')
    player_figure = models.CharField('игровая фигура', max_length=100, null=False, blank=True, default='')
    winner = models.CharField('победитель', max_length=100, null=False, blank=True, default='')
    winner_cells = models.CharField('ячейки победы', max_length=255, null=False, blank=True, default='')
    game_date = models.DateTimeField('дата игры', auto_now_add=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='gamelist')
    user_pk = models.IntegerField()

    class Meta:
        ordering = ['pk']

    def __str__(self):
        return f'Позиция {self.user_pk}'

    def get_game_date(self):
        return self.game_date.strftime('%d.%m.%Y')

    def get_game_time(self):
        return self.game_date.strftime('%H:%M:%S')    
 
    def save(self, *args, **kwargs):
        self.user = User.objects.get(pk=self.user_pk)
        super().save(*args, **kwargs)

