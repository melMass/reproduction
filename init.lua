local function bootstrap_lazy()
	local lazypath = vim.fn.stdpath("data") .. "/lazy/lazy.nvim"
	if not vim.loop.fs_stat(lazypath) then
		local lazyrepo = "https://github.com/folke/lazy.nvim.git"
		local out = vim.fn.system({ "git", "clone", "--filter=blob:none", "--branch=stable", lazyrepo, lazypath })
		if vim.v.shell_error ~= 0 then
			error("Error cloning lazy.nvim:\n" .. out)
		end
	end
	vim.opt.rtp:prepend(lazypath)
end

-- Install lazy
bootstrap_lazy()

-- disable line numbers in Term buffers
vim.api.nvim_create_autocmd("TermOpen", {
	desc = "remove line numbers from terminals and automatically enters insert mode",
	group = vim.api.nvim_create_augroup("term_open", { clear = true }),
	callback = function()
		vim.opt_local.statusline = "%{b:term_title}"
		vim.opt_local.number = false
		vim.opt_local.relativenumber = false
		-- require('echo').play_builtin('EXPAND')
		vim.cmd("startinsert")
	end,
})

-- Lazy
require("lazy").setup({
	{ import = "plugins", cond = true },
}, {
	defaults = {
		lazy = false,
	},
	checker = {
		enabled = true,
		notify = false,
	},
})
