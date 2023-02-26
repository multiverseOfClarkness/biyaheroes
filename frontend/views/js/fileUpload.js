const evidencee = document.getElementById("evidence")


FilePond.registerPlugin(
    FilePondPluginImagePreview,
    FilePondPluginImageResize,
    FilePondPluginFileEncode,
    FilePondPluginFileValidateSize,
    FilePondPluginFileValidateType
)


const pond = FilePond.create(evidencee);
pond.setOptions({
    acceptedFileTypes: ['image/jpeg', 'image/jpg', 'image/png']
})