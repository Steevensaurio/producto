# Generated by Django 5.1.2 on 2024-12-16 22:17

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0025_opcioncurso_opcionparalelo_alter_tutoria_modalidad_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='opcioncurso',
            old_name='nombrecurso',
            new_name='cursos',
        ),
        migrations.RenameField(
            model_name='opcionparalelo',
            old_name='nombreparalelo',
            new_name='paralelos',
        ),
    ]
