from setuptools import find_packages, setup

# INFO: Upon changing `sse` name, change string value in
# processing/utils/get_version_from_setup.py
setup(
    name="cse",
    version="1.0.18",
    description="CoralSoundExplorer",
    author="Bamdad Sabbagh",
    author_email="hi@bamdad.fr",
    packages=find_packages(),
    install_requires=[
        # List any dependencies your module has here
    ],
    entry_points={
        "console_scripts": [
            "cse = processing.cli:start_processing",
            "cse_config = processing.cli:extract_config",
            "cse_vis = processing.cli:start_visualisation",
            "cse_viz = processing.cli:start_visualisation",
            "cse_fill = processing.cli:start_fill",
            "cse_audio = processing.cli:start_audio",
        ],
    },
)
