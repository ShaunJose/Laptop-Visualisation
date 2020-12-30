# @author: Shaun

def normalise_memory_2d_list(values_list, full_list, memory_index):

    for i in range(0, len(values_list)):
        values_list[i] = __normalise_memory_in_list(values_list[i], full_list[i], memory_index)

    return values_list


def __normalise_memory_in_list(value_list, memory_list, memory_index):

    if "GB" in memory_list[memory_index]:
        value_list[memory_index] = value_list[memory_index]/1000

    return value_list
