# Generated by Django 5.1.2 on 2024-12-19 06:18

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0028_alter_matriculas_options_alter_matriculas_table'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='estudiante',
            name='curso',
        ),
        migrations.RemoveField(
            model_name='estudiante',
            name='jornada',
        ),
    ]
