# Generated by Django 5.1.2 on 2024-12-16 22:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0024_tutor_titulo'),
    ]

    operations = [
        migrations.CreateModel(
            name='opcionCurso',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombrecurso', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='opcionParalelo',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombreparalelo', models.CharField(max_length=1)),
            ],
        ),
        migrations.AlterField(
            model_name='tutoria',
            name='modalidad',
            field=models.CharField(choices=[('Presencial', 'Presencial'), ('Virtual', 'Virtual')], max_length=100),
        ),
        migrations.AlterField(
            model_name='tutoria',
            name='seccion',
            field=models.CharField(choices=[('Matutina', 'Matutina'), ('Vespertina', 'Vespertina')], default='Matutina', max_length=10),
        ),
    ]
