# Generated by Django 4.2.6 on 2023-10-22 08:20

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import invoice.validators
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='PaymentDetails',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('iban', models.CharField(max_length=34, validators=[invoice.validators.iban_validator])),
                ('provider', models.CharField(max_length=255)),
                ('address', models.CharField(max_length=255)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Invoice',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('number', models.CharField(max_length=20, unique=True)),
                ('issued_date', models.DateField()),
                ('due_date', models.DateField()),
                ('status', models.CharField(choices=[('validated', 'Validated'), ('sent', 'Sent'), ('paid', 'Paid'), ('overdue', 'Overdue')], max_length=50)),
                ('investor', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to=settings.AUTH_USER_MODEL)),
                ('payment_details', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='invoice.paymentdetails')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Investment',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('name', models.CharField(max_length=50)),
                ('description', models.CharField(max_length=255, null=True)),
                ('upfront_fees', models.BooleanField(default=False)),
                ('fee_percentage', models.DecimalField(decimal_places=2, max_digits=3)),
                ('amount_invested', models.DecimalField(decimal_places=2, max_digits=20)),
                ('investor', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Bill',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('bill_type', models.CharField(choices=[('subscription', 'Subscription'), ('fees', 'Fees')], max_length=50)),
                ('total', models.DecimalField(decimal_places=2, max_digits=20)),
                ('date', models.DateField()),
                ('investment', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.DO_NOTHING, to='invoice.investment')),
                ('investor', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to=settings.AUTH_USER_MODEL)),
                ('invoice', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.DO_NOTHING, to='invoice.invoice')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.AddConstraint(
            model_name='investment',
            constraint=models.UniqueConstraint(fields=('name', 'investor_id'), name='unique_investment_name_by_investor'),
        ),
    ]