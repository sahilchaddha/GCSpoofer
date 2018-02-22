#!/bin/sh

# Deployer - Sahil Chaddha

##### Main
alias changeDirectoryAlias=$1
changeDirectoryAlias
echo $2
echo "var i: Int = 1" >> file.swift; git add .; git commit -m "WIP: Changes" --date="$2";