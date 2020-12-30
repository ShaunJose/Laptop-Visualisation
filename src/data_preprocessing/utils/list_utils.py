# @author: Shaun

def __get_indexes(list, elements):
    """
    Gets indexes of elements in the list

    :param list: List in which elements' indexes need to be found
    :param elements: List of elements' values whose indexes need to be found
    :return: List of indexes of elements in the list
    """

    # Iterate through elements and get indexes of elements in the list
    indexes = []
    for elem in elements:
        elem_index = list.index(elem)
        indexes.append(elem_index)

    return indexes


def __filter_list(list, indexes):
    """
    Trim list by only including indexes needed

    :param list: List to be trimmed
    :param indexes: Indexes of values needed from the list
    :return: List with values from indexes given
    """

    # Iterate through indexes and add those values to a filtered list
    filtered_list = []
    for index in indexes:
        filtered_list.append(list[index])

    return filtered_list


def filter_2d_list(two_d_list, all_fields, wanted_fields):
    """
    Trims a 2-dimensional list to get fields wanted

    :param two_d_list: The 2-dimensional list to be trimmed
    :param all_fields: List of fields in each list within the 2-d list
    :param wanted_fields: List of fields wanted from all the fields in the 2-d list
    :return: A filtered 2-d list containing lists with elements of only the wanted fields
    """

    # Get indexes of fields meeded
    wanted_indexes = __get_indexes(all_fields, wanted_fields)

    # Append the wanted fields to a new 2-dimensional list
    filtered_2d_list = []
    for curr_list in two_d_list:
        filtered_list = __filter_list(curr_list, wanted_indexes)
        filtered_2d_list.append(filtered_list)

    return filtered_2d_list


def multiply_all_elems(my_list, factor):

    for i in range(0, len(my_list)):
        my_list[i] = my_list[i] * factor

    return my_list


def round_all_elems(my_list, dec_places):

    for i in range(0, len(my_list)):
        my_list[i] = round(my_list[i], dec_places)

    return my_list
