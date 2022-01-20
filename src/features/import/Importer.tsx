import { useAppDispatch, useAppSelector } from "app/hooks";
import { RootState } from "app/store";
import teamSlice, { setCharacter, setTeam } from "features/team/teamSlice";
import React, { SetStateAction, useState } from "react";
import { IGOODImport, staticPath, parseFromGO } from "../../util";
import { setJSON } from "./importSlice";
import useLocation from "wouter/use-location";

const notImplemented = [
  "traveler",
  "aether",
  "barbara",
  "lumine",
  "razor",
  "sayu",
  "thoma",
  "xinyan",
];

function GridView({
  data,
  handleSelect,
}: {
  data: IGOODImport;
  handleSelect: (index: number) => any;
}) {
  const portraits = data.characters.map((char, index) => {
    return (
      <div
        key={char.key}
        className={
          data.selected[index]
            ? "selected-char-box overflow-hidden bg-gray-600 rounded-md "
            : notImplemented.includes(char.key.toLowerCase())
            ? "selected-char-box overflow-hidden rounded-md cursor-not-allowed"
            : "selected-char-box overflow-hidden rounded-md hover:bg-gray-500 cursor-pointer"
        }
        onClick={handleSelect(index)}
      >
        <img
          src={`${staticPath.avatar}/${char.key}.png`}
          alt={char.name}
          className={
            data.selected[index]
              ? "object-contain opacity-100"
              : "object-contain opacity-50"
          }
        />
      </div>
    );
  });

  return <div className="grid grid-cols-12 gap-2 ">{portraits}</div>;
}

export default function Importer() {
  const dispatch = useAppDispatch();
  const [_, setLocation] = useLocation();
  const [importStatus, setImportStatus] = useState(false);
  const { text } = useAppSelector((state: RootState) => {
    return {
      text: state.import,
    };
  });
  const team = useAppSelector((state) => state.team);
  //Using a hook for the selectedArray only
  const preData = parseFromGO(text);
  const [selectedArray, setSelectedArray] = useState(preData.selected);
  const data = { ...preData, selected: selectedArray };

  const handleSelect = (index: number) => {
    return () => {
      if (notImplemented.includes(data.characters[index].key.toLowerCase())) {
        return;
      }
      if (data.selected[index]) {
        //Make a new array, update it and use it to set state
        const updatedSelectedArray = [...data.selected];
        updatedSelectedArray[index] = !updatedSelectedArray[index];
        setSelectedArray(updatedSelectedArray);
      }
      // handleSelect(index);
      //Only select if less than 4 characters
      if (data.selected.filter(Boolean).length >= 4) {
        return;
      }
      // I wish there was a cleaner way
      const updatedSelectedArray = [...data.selected];
      updatedSelectedArray[index] = !updatedSelectedArray[index];
      setSelectedArray(updatedSelectedArray);
    };
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(setJSON(e.currentTarget.value));
  };

  const handleImport = () => {
    //Get the characters that were selected
    const selectedCharacters = data.characters.filter((char, index) => {
      return data.selected[index];
    });
    // Redux thingy
    dispatch(setTeam({ data: selectedCharacters }));
    setImportStatus(true);
  };

  return (
    <>
      {
        importStatus && (
          <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-auto my-6 mx-auto max-w-3xl">
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-gray-700 outline-none focus:outline-none">
                  {/*header*/}
                  <div className="flex items-start justify-between border-solid border-blueGray-200 rounded-t">
                    {/* <h3 className="text-3xl font-semibold">Modal Title</h3> */}
                    <button
                      className="p-2 ml-auto bg-transparent border-0 text-white text-3xl leading-none font-semibold outline-none focus:outline-none"
                      onClick={() => {setImportStatus(false)}}
                    >
                      <span className="bg-transparent text-white-500 h-6 w-6 text-2xl block outline-none focus:outline-none">
                        ×
                      </span>
                    </button>
                  </div>
                  {/*body*/}
                  <div className="relative p-3 flex items-center justify-center">
                    <p className="my-4 text-white text-lg leading-relaxed">
                      Successfully imported!
                    </p>
                  </div>
                  {/*footer*/}
                  <div className="flex items-center justify-end p-3 rounded-b">
                    <button
                      className="text-white-500 background-transparent font-semibold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setImportStatus(false)}
                    >
                      Import Again
                    </button>
                    <button
                      className="btn-primary bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => {setImportStatus(false); setLocation("/");}}
                    >
                      View Team
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
        )
      }
      <div className="flex flex-col gap-y-4 pl-8 pr-8">
        <div>
          <div className="text-lg font-bold">Instructions</div>
          Under Genshin Optimizer's
          <a
            className="text-blue-600 hover:text-blue-400"
            target="_blank"
            href="https://frzyc.github.io/genshin-optimizer/#/database"
          >
            <text> database </text>
          </a>
          tab, click on <strong>Copy to Clipboard</strong> button. Paste the
          result in the text area below. Select up to 4 characters from the list
          below and click Import Team to finish import.
          <strong className="text-yellow-400">
            This will overwrite any existing team. This action cannot be reversed.
            You have been warned
          </strong>
        </div>

        {data.err === "" ? (
          <GridView data={data} handleSelect={handleSelect} />
        ) : (
          "No characters found in Genshin Optimizer export"
        )}

        <div
          className={
            data.err !== ""
              ? "rounded-md p-2 bg-gray-600 border-red-500 border-2 flex flex-col"
              : "rounded-md p-2 bg-gray-600 flex flex-col"
          }
        >
          <textarea
            rows={5}
            className="bg-transparent whitespace-pre text-xs font-mono w-full"
            placeholder="Paste JSON from Genshin Optimizer here"
            onChange={handleOnChange}
          />
          {data.err !== "" ? (
            <span className="mt-2 text-red-500">Invalid JSON</span>
          ) : null}
        </div>
        <button
          className="btn btn-primary w-full"
          onClick={handleImport}
          disabled={data.selected.filter(Boolean).length === 0}
        >
          Import Team
        </button>
      </div>
    </>
  );
}
