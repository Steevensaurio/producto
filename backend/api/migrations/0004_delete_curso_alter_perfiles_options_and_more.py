# Generated by Django 5.1.2 on 2024-12-03 04:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_curso_perfiles'),
    ]

    operations = [
        migrations.DeleteModel(
            name='Curso',
        ),
        migrations.AlterModelOptions(
            name='perfiles',
            options={'verbose_name': 'Perfiles', 'verbose_name_plural': 'Perfiles'},
        ),
        migrations.AlterModelOptions(
            name='tutoria',
            options={'verbose_name': 'Tutoria', 'verbose_name_plural': 'Tutoria'},
        ),
        migrations.RemoveField(
            model_name='tutoria',
            name='autor',
        ),
        migrations.RemoveField(
            model_name='tutoria',
            name='comentario',
        ),
        migrations.RemoveField(
            model_name='tutoria',
            name='curso',
        ),
        migrations.AlterField(
            model_name='perfiles',
            name='descripcion',
            field=models.CharField(blank=True, max_length=250, null=True),
        ),
        migrations.AlterField(
            model_name='perfiles',
            name='perfil',
            field=models.CharField(blank=True, max_length=250, null=True),
        ),
        migrations.AlterField(
            model_name='tutoria',
            name='seccion',
            field=models.CharField(choices=[('M', 'Matutina'), ('V', 'Vespertina')], default='M', max_length=10),
        ),
        migrations.AlterModelTable(
            name='perfiles',
            table='perfiles',
        ),
        migrations.AlterModelTable(
            name='tutoria',
            table='tutoria',
        ),
    ]