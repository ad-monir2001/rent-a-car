import { useEffect, useState } from 'react';
import { MdDeleteOutline } from 'react-icons/md';
import Dropzone from 'react-dropzone';
const AddCar = () => {
  const [files, setFiles] = useState([]);
  const [image, setImage] = useState();
  console.log(image);

  // useEffect(() => {
  //   // Cleanup preview URLs when component unmounts or files change
  //   return () => {
  //     files.forEach(file => {
  //       if (file.preview) {
  //         URL.revokeObjectURL(file.preview);
  //       }
  //     });
  //   };
  // }, [files]);

  // delete unwanted file

  const removeFile = (name) => {
    setFiles((files) => files.filter((file) => file.name !== name));

    // setFiles((files) => {
    //   const fileToRemove = files.find(file => file.name === name);
    //   if (fileToRemove?.preview) {
    //     URL.revokeObjectURL(fileToRemove.preview);
    //   }
    //   return files.filter((file) => file.name !== name);
    // });
  };

  const handleForm = (e) => {
    e.preventDefault();
    const form = e.target;
  };
  return (
    <div>
      <div className="text-center my-4 space-y-1">
        <p className="font-body text-lg text-[#ff3600] italic">
          Drive Your Dreams with Ease!
        </p>
        <h1 className="font-heading text-3xl font-semibold">
          Add Your Favorite one
        </h1>
        <div className="hero bg-base-100  bg-no-repeat bg-cover my-12">
          <div className="hero-content  w-full flex-col">
            <div className="rounded-2xl   bg-[url(/images/addcar.png)] bg-gray-700 bg-blend-overlay md:w-3/5 bg-no-repeat bg-cover dark:border">
              <form onSubmit={handleForm} className="card-body">
                <div className="form-control">
                  <label className="label">
                    <span className="font-medium text-xl font-heading text-[#ff3600]">
                      Car Model
                    </span>
                  </label>
                  <input
                    type="text"
                    name="model"
                    placeholder="The car model"
                    className="input input-bordered font-body"
                    required
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="font-medium text-xl font-heading text-[#ff3600]">
                      Availability
                    </span>
                  </label>
                  <input
                    type="text"
                    name="availability"
                    placeholder="Availability"
                    className="input input-bordered font-body"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="font-medium text-xl font-heading text-[#ff3600]">
                      Reg Number
                    </span>
                  </label>
                  <input
                    type="text"
                    name="regNumber"
                    placeholder="Vehicle Registration Number"
                    className="input input-bordered font-body"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="font-medium text-xl font-heading text-[#ff3600]">
                      Features
                    </span>
                  </label>
                  <input
                    type="text"
                    name="features"
                    placeholder="Vehicle Features"
                    className="input input-bordered font-body"
                    required
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="font-medium text-xl font-heading text-[#ff3600]">
                      Review Description
                    </span>
                  </label>
                  <textarea
                    type="text"
                    name="description"
                    placeholder=" A detailed review of the Car
"
                    className="textarea input-bordered font-body"
                    required
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="font-medium text-xl font-heading text-[#ff3600]">
                      Booking Count
                    </span>
                  </label>
                  <input
                    type="number"
                    name="count"
                    defaultValue={0}
                    placeholder="Booking count"
                    className="input input-bordered font-body"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="font-medium text-xl font-heading text-[#ff3600]">
                      Upload Your Image
                    </span>
                  </label>
                  <Dropzone
                    accept={{
                      'image/jpeg': ['.jpg', '.jpeg'],
                      'image/png': ['.png'],
                    }}
                    onDrop={(acceptedFiles) => {
                      if (acceptedFiles?.length) {
                        const newFiles = acceptedFiles.map((file) => ({
                          name: file.name,
                          preview: URL.createObjectURL(file),
                          file: file, // Store the original file for form submission
                        }));

                        if (newFiles.length > 0) {
                          setImage(newFiles[newFiles.length - 1].preview);
                        }

                        setFiles((prevFiles) => [...prevFiles, ...newFiles]);
                      }
                    }}
                  >
                    {({ getRootProps, getInputProps }) => (
                      <section>
                        <div
                          className="p-16 mt-10 rounded-lg border border-neutral-200"
                          {...getRootProps()}
                        >
                          <input {...getInputProps()} />
                          <p className="font-body mt-2 text-[#ff3600]">
                            Drag drop Only images here, or click to select
                            images
                          </p>
                        </div>
                      </section>
                    )}
                  </Dropzone>
                </div>

                {/* preview image here */}
                <div>
                  <p className="font-heading text-[#ff3600] text-xl mb-3">
                    Image Preview:
                  </p>
                  <div className="flex gap-3">
                    {files?.map((file) => (
                      <li className="list-none relative" key={file.name}>
                        <img
                          src={file.preview}
                          alt=""
                          className="w-20 h-20 object-cover rounded-lg"
                        ></img>
                        <button
                          className="absolute right-0 -top-3 text-red-500 bg-white rounded-lg text-2xl"
                          onClick={() => removeFile(file.name)}
                        >
                          <MdDeleteOutline />
                        </button>
                      </li>
                    ))}
                  </div>
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="font-medium text-xl font-heading text-[#ff3600]">
                      Location
                    </span>
                  </label>
                  <input
                    type="text"
                    name="location"
                    placeholder="location"
                    className="input input-bordered font-body"
                    required
                  />
                </div>

                <div className="form-control mt-6">
                  <button className="btn font-heading text-xl border border-[#ff3600] text-[#ff3600] hover:text-white hover:bg-[#ff3600] hover:border-none">
                    Add Review
                  </button>
                </div>

                <div></div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCar;
