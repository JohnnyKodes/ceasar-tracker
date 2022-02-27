import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";

export default function Example({ newsCategory, setNewsCategory, coins }) {
  return (
    <Listbox value={newsCategory} onChange={setNewsCategory}>
      <div className="relative mt-1">
        <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm">
          <span className="block truncate">{newsCategory}</span>
          <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <SelectorIcon
              className="w-5 h-5 text-gray-400"
              aria-hidden="true"
            />
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            <Listbox.Option
              className={`cursor-pointer hover:bg-yellow-100 select-none relative py-2 pl-10 pr-4 ${
                newsCategory === "Cryptocurrency"
                  ? "text-yellow-600 bg-yellow-200"
                  : "text-gray-900"
              }`}
              value="Cryptocurrency"
            >
              <span
                className={`block truncate ${
                  newsCategory === "Cryptocurrency"
                    ? "font-medium"
                    : "font-normal"
                }`}
              >
                All
              </span>
              {newsCategory === "Cryptocurrency" ? (
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                  <CheckIcon className="w-5 h-5" aria-hidden="true" />
                </span>
              ) : null}
            </Listbox.Option>
            {coins?.map((coin) => (
              <Listbox.Option
                key={coin.uuid}
                className={`cursor-pointer hover:bg-yellow-100 select-none relative py-2 pl-10 pr-4 ${
                  newsCategory === coin.name
                    ? "text-yellow-600 bg-yellow-200"
                    : "text-gray-900"
                }`}
                value={coin?.name}
              >
                <span
                  className={`truncate flex gap-2 ${
                    newsCategory === coin.name ? "font-medium" : "font-normal"
                  }`}
                >
                  <img
                    src={coin.iconUrl}
                    alt={`${coin.name}-icon`}
                    className="h-6 w-6"
                  />
                  {coin.name}
                </span>
                {newsCategory === coin.name ? (
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-yellow-500">
                    <CheckIcon className="w-5 h-5" aria-hidden="true" />
                  </span>
                ) : null}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
}
