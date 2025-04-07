import { useState } from "react"
import { FlatList, Text,View, TouchableOpacity } from "react-native"
import Icon from 'react-native-vector-icons/Ionicons';

interface ListProps {
  filter:string,
  setSelectedFilter : (title:string) => void
}

function List({filter,setSelectedFilter} : ListProps) {

  type filterProps = {
    id: number,
    title: string,
    icons: string
  }
  
  
  const filters = [
    {
      id: 1,
      title: '',
      name:"All",
      icons: 'grid-outline'
    },
    {
      id: 2,
      title: 'Shoes',
      name:'Shoes',
      icons: 'beach-slipper'
    },
    {
      id: 3,
      title: "Men's",
      name:'Men',
      icons: "shirt-outline"
    },
    {
      id: 4,
      title: "Watch",
      name:'Watch',
      icons: "watch-outline",
    },
    {
      id: 5,
      name:'Electronics',
      title: "Electronics",
      icons: "headset-outline"
    },
    {
      id: 6,
      name:'Book',
      title: "Book",
      icons: "book-outline"
    },
  
  
  ]

  return (
    <View className=' w-11/12 mx-auto '>
      <FlatList
        data={filters}
        renderItem={({ item }: { item: filterProps }) => <Item selectedFilter={filter} setSelectedFilter={setSelectedFilter} {...item} />}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingTop: 0, marginTop: 0, display: 'flex', flexDirection: 'row', gap: 30 }} // Remove any extra margin
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      />
    </View>
  )
}

const Item = ({ id,name, title, icons, setSelectedFilter, selectedFilter }: any) => {

  const isSelected = (selectedFilter ===  title)
  return (
    <TouchableOpacity onPress={() => setSelectedFilter(title)}>
      <View key={id} className='flex   flex-col gap-1 justify-center items-center'>
        <View className={` ${isSelected ? 'bg-[#f5d784] border-[#f5d784]' : 'bg-[#f2f1f0] border-gray-300'}  w-12 h-12 rounded-full`}>
          <Icon className='m-auto' color={isSelected ? '#f5f2eb' : ''} name={icons} size={20} />
        </View>
        <Text className={`${isSelected ? 'text-[#dda91b] font-medium' : 'text-grey'} text-sm`}>
          {name}
        </Text>
      </View>
    </TouchableOpacity >

  )
}

export default List;