# @author: Shaun

import csv

def read_csv(csv_filepath):
    """
    Reads in csv from the filepath given

    :param csv_filepath: path of the csv file to be read
    :return: contents of the csv file in a 2-d list
    """

    data = []

    # Open csv, and read data row by row into a 2-d list
    with open("../../data/laptops.csv") as filepath:
        data_reader = csv.reader(filepath, delimiter = ",")
        for row in data_reader:
            data.append(row)

    return data
