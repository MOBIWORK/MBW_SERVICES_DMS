from setuptools import setup, find_packages

with open("requirements.txt") as f:
	install_requires = f.read().strip().split("\n")

# get version from __version__ variable in mbw_dms/__init__.py
from mbw_dms import __version__ as version

setup(
	name="mbw_dms",
	version=version,
	description="API MBW DMS",
	author="MBW",
	author_email="dev@mbw.vn",
	packages=find_packages(),
	zip_safe=False,
	include_package_data=True,
	install_requires=install_requires
)
