import * as pdfjsLib from "pdfjs-dist";
import { useEffect, useRef } from "react"

export default ({ pdfDoc, pageNum, onVisible })=> {
        let renderTask = null
        let cancelled = false

        const canvasRef = useRef(null)
        const rowref = useRef(null)
        const prevPdfDoc = useRef(pdfDoc);

        prevPdfDoc.current = pdfDoc;
         useEffect(() => {
            const loadPdf = async () => {
            try{
                const page = await pdfDoc.getPage(pageNum)
                if(cancelled === true){

                }

                const canvas = canvasRef.current
                const ctx = canvas.getContext('2d')

                const viewport = page.getViewport({ scale: 0.5 });
                canvas.height = viewport.height;
                canvas.width = viewport.width;

                const renderContext = {
                     canvasContext: ctx,
                     viewport: viewport
                } 
                renderTask = page.render(renderContext)
                await renderTask.promise
            }
            catch(err){
                if (err?.name !== 'RenderingCancelledException') {
                    console.error(err)
                }
            }
            }
            loadPdf()
            return () => {
                cancelled = true

                if(renderTask){
                    renderTask.cancel()
                }
            }
         }, [ pdfDoc])
          useEffect(()=>{
            const PageObserver = new IntersectionObserver(
                ([entry])=> {
                    if(entry.isIntersecting){
                        onVisible(pageNum)
                    }
                }, {threshold: 0.5})
            if(rowref.current) PageObserver.observe(rowref.current);
            return () => PageObserver.disconnect()
        }, [pageNum, onVisible])

        return(
            <>  <div ref={rowref} id={`mangaPage${pageNum}`}>
                <canvas ref= {canvasRef}></canvas>
                </div>
            </>
        )
   }

