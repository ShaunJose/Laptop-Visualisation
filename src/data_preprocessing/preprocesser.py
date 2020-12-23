# @author: Shaun

from parameters import constants
from utils import csv_utils
from utils import list_utils
from utils import data_type_utils
from utils import memory_value_utils

import re

if __name__ == "__main__":

    # Read csv and take the first line as headings
    data = csv_utils.read_csv(constants.csv_filepath)
    headings = data.pop(0)

    listy_list = list_utils.filter_2d_list(data, headings, constants.numeric_fields)

    all_numbers_list = []
    numeric_regex = "\d+\.\d+|\d+"
    for list in listy_list:
        numbers_list = []
        for elem in list:
            numeric_values = re.findall(numeric_regex, elem)
            value = numeric_values[0]
            numbers_list.append(value)
        all_numbers_list.append(numbers_list)

    all_numbers_list = data_type_utils.two_d_list_string_to_float(all_numbers_list)

    all_numbers_list = memory_value_utils.normalise_memory_2d_list(all_numbers_list, listy_list, constants.numeric_fields.index("Memory"))

    print(listy_list[0])
    print(all_numbers_list[0])
    print(listy_list[259])
    print(all_numbers_list[259])
    print(listy_list[308])
    print(all_numbers_list[308])
    print(listy_list[500])
    print(all_numbers_list[500])
    print(listy_list[1001])
    print(all_numbers_list[1001])


    # find_averages(constants.)
