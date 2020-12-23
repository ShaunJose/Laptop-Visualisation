# @author: Shaun

from parameters import constants
from utils import csv_utils
from utils import list_utils

if __name__ == "__main__":

    # Read csv and take the first line as headings
    data = csv_utils.read_csv(constants.csv_filepath)
    headings = data.pop(0)

    listy_list = list_utils.filter_2d_list(data, headings, constants.numeric_fields)
    print(listy_list)


    # find_averages(constants.)
