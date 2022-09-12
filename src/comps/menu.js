import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { IoIosArrowDown } from "react-icons/io"

export default function DropDown() {
  return (
    <div className="text-right z-20 mr-6">
      <Menu as="div" className="relative inline-block text-left">
        <Menu.Button className="flex items-center">
          Grocieries
          <IoIosArrowDown className="ml-2" />
        </Menu.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="p-3 flex flex-col items-start">
              <Menu.Item>
                <button className="text-black mb-4 w-full text-start">
                  Dairy
                  <div className="mt-1 border-b-2 border-red-300 w-full"></div>
                </button>
              </Menu.Item>
              <Menu.Item>
                <button className="text-black mb-4 w-full text-start">
                  Vegetables
                  <div className="mt-1 border-b-2 border-red-300 w-full"></div>
                </button>
              </Menu.Item>
              <Menu.Item>
                <button className="text-black mb-4 w-full text-start">
                  Meat
                  <div className="mt-1 border-b-2 border-red-300 w-full"></div>
                </button>
              </Menu.Item>
              <Menu.Item>
                <button className="text-black mb-4 w-full text-start">
                  Fruits
                  <div className="mt-1 border-b-2 border-red-300 w-full"></div>
                </button>
              </Menu.Item>
              <Menu.Item>
                <button className="text-black w-full text-start">
                  Chips
                </button>
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}