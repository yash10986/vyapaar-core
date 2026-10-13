import pymysql
pymysql.install_as_MySQLdb()

from django.db.backends.mysql.base import DatabaseWrapper

old_init = DatabaseWrapper.__init__

def new_init(self, *args, **kwargs):
    old_init(self, *args, **kwargs)
    self.features.can_return_columns_from_insert = False

DatabaseWrapper.__init__ = new_init

def check_database_version_supported(self):
    pass

DatabaseWrapper.check_database_version_supported = check_database_version_supported