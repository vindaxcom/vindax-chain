#!/bin/bash
# create multiresolution windows icon
ICON_DST=../../src/qt/res/icons/vindax.ico

convert ../../src/qt/res/icons/vindax-16.png ../../src/qt/res/icons/vindax-32.png ../../src/qt/res/icons/vindax-48.png ${ICON_DST}
