# Generated by Django 5.1.2 on 2024-12-13 01:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0019_remove_representante_fecha_nacimiento_tutoria_curso_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='representante',
            name='telefono',
            field=models.CharField(blank=True, max_length=10, null=True),
        ),
    ]
