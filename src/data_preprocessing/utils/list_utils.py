# @author: Shaun

def __get_indexes(list, elements):

    indexes = []

    for elem in elements:
        elem_index = list.index(elem)
        indexes.append(elem_index)

    return indexes


def __filter_list(list, indexes):

    # Add contents of list from indexes given
    filtered_list = []
    for index in indexes:
        filtered_list.append(list[index])

    return filtered_list


def filter_2d_list(two_d_list, all_fields, wanted_fields):

    # get indexes of fields meeded
    wanted_indexes = __get_indexes(all_fields, wanted_fields)

    # append the needed fields to a new 2-dimensional list
    filtered_2d_list = []
    for curr_list in two_d_list:
        filtered_list = __filter_list(curr_list, wanted_indexes)
        filtered_2d_list.append(filtered_list)

    return filtered_2d_list
