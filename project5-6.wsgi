#!/urs/bin/python
import sys
import logging
logging.basicConfig(stream=sys.stderr)
sys.path.insert(0,"/var/www/Project5-6")

from Webshop.app import app as application
