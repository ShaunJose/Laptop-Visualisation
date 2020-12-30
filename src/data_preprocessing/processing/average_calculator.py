# @author: Shaun

from itertools import repeat

def calculate_averages(data_values):

    average_values = [0] * len(data_values[0])

    for list in data_values:
        for i in range(0, len(list)):
            average_values[i] += list[i]

    data_values_count = len(data_values)
    for i in range(0, len(average_values)):
        average_values[i] = average_values[i]/data_values_count

    return average_values
