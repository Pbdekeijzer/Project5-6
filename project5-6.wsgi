#!/urs/bin/python3
import sys
import logging
activate_this = "/var/www/Project5-6/venv/bin/activate_this.py"
with open(activate_this) as file_:
	exec(file_.read(), dict(__file__ = activate_this))
logging.basicConfig(stream=sys.stderr)
sys.path.insert(0,"/var/www/Project5-6")

from app import app as application
